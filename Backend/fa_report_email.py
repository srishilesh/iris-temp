import smtplib
import sys
import json

toaddr = sys.argv[0]
ccode = sys.argv[1]

s = smtplib.SMTP('smtp.gmail.com',587)
s.starttls()
s.login('thehawkblack00@gmail.com','')
SUBJECT = "Iris: FA Warning List"
TEXT = "It is bring to your notice that your child the attendance in the course "+ccode+" is below 50%"


message = 'Subject: {}\n\n{}'.format(SUBJECT, TEXT)
s.sendmail("thehawkblack00@gmail.com",toaddr,message)
# print("Email sent successfully to ",toaddr, " on ",date," at ",time)

s.quit()
