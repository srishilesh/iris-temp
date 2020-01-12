import smtplib
import sys

toaddr = sys.argv[1]
otp = sys.argv[2]
date = sys.argv[3]
time = sys.argv[4]

s = smtplib.SMTP('smtp.gmail.com',587)
s.starttls()
s.login('thehawkblack00@gmail.com','')
SUBJECT = "Iris: Change in password: Verification"
TEXT = "To authenticate, please use the following One Time Password (OTP): \n"+otp+" \nDo not share this OTP with anyone. Iris takes your account security very seriously. The Service will never ask you to disclose or verify your password or OTP. If you receive a suspicious email with a link to update your account information, do not click on the link-instead, report the email to Iris for investigation. We hope to see you again soon."


message = 'Subject: {}\n\n{}'.format(SUBJECT, TEXT)
s.sendmail("thehawkblack00@gmail.com",toaddr,message)
print("Email sent successfully to ",toaddr, " on ",date," at ",time)

s.quit()
