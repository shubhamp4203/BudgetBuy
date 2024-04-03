from django.db import models

# Create your models here.

class UserOtp(models.Model):
    email = models.EmailField(max_length=255, primary_key=True)
    otp = models.IntegerField(null=True)

    def __str__(self):
        return str(self.email)
    
    class Meta:
        db_table = 'user_otp'