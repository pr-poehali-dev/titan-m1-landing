import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта ТИТАН М1 на email."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    raw_body = event.get("body") or "{}"
    if isinstance(raw_body, dict):
        body = raw_body
    else:
        try:
            body = json.loads(raw_body)
        except Exception:
            return {"statusCode": 400, "headers": cors_headers, "body": {"error": "Invalid JSON"}}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    comment = body.get("comment", "").strip()
    options = body.get("options", [])
    total_price = body.get("total_price", 0)

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": {"error": "Name and phone are required"},
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    from_email = "service.techno.krd@yandex.ru"
    to_email = "service.techno.krd@yandex.ru"

    options_block = ""
    if options:
        options_block = "\nВыбранные опции:\n" + "\n".join(f"  • {o}" for o in options)
        options_block += f"\n\nИтоговая стоимость: {total_price:,} ₽".replace(",", " ")

    text_body = f"""Новая заявка с сайта ТИТАН М1

Имя: {name}
Телефон: {phone}
{f'Комментарий: {comment}' if comment else ''}{options_block}
"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Заявка ТИТАН М1 — {name}"
    msg["From"] = from_email
    msg["To"] = to_email

    html_body = f"""
<html><body style="font-family: Arial, sans-serif; color: #222; background: #f9f9f9; padding: 24px;">
  <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 32px; border: 1px solid #e0e0e0;">
    <h2 style="color: #C9A84C; margin-top: 0;">Новая заявка — ТИТАН М1</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #888; width: 140px;">Имя</td><td style="padding: 8px 0; font-weight: bold;">{name}</td></tr>
      <tr><td style="padding: 8px 0; color: #888;">Телефон</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:{phone}" style="color: #C9A84C;">{phone}</a></td></tr>
      {'<tr><td style="padding: 8px 0; color: #888; vertical-align: top;">Комментарий</td><td style="padding: 8px 0;">' + comment + '</td></tr>' if comment else ''}
    </table>
    {'<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"><h3 style="color: #555; margin: 0 0 12px;">Выбранные опции</h3><ul style="margin: 0; padding-left: 20px;">' + ''.join(f'<li style="padding: 4px 0;">{o}</li>' for o in options) + '</ul><p style="margin-top: 16px; font-size: 18px; color: #C9A84C; font-weight: bold;">Итого: ' + f"{total_price:,}".replace(",", " ") + ' ₽</p>' if options else ''}
    <p style="margin-top: 24px; font-size: 12px; color: #aaa;">Заявка получена с сайта titantechno.ru</p>
  </div>
</body></html>
"""

    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": {"ok": True, "message": "Заявка отправлена"},
    }