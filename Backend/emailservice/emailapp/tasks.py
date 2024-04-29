from celery import shared_task
from django.core.mail import send_mail
from django.core.mail import EmailMessage
@shared_task
def send_email_task(subject, message, from_email, recipient_list):
    send_mail(subject, message, from_email, recipient_list)

@shared_task
def send_pdf_email_task(subject, message, from_email, recipient_list, pdf_path):
    email = EmailMessage(subject, message, from_email, recipient_list)
    email.attach_file(pdf_path)
    email.send()