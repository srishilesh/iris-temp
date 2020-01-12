import smtplib
import sys

toaddr = sys.argv[1]
date = sys.argv[2]
time = sys.argv[3]
cl = sys.argv[4]
od = sys.argv[5]
ml = sys.argv[6]
lp = sys.argv[7]
present = sys.argv[8]
absent = sys.argv[9]
ml_remaining = sys.argv[10]
cl_remaining = sys.argv[11]

s = smtplib.SMTP('smtp.gmail.com',587)
s.starttls()
s.login('thehawkblack00@gmail.com','phantom19')
SUBJECT = "Iris: Attendance Report Summary"
TEXT = "Date: "+date+"\nTime: "+time+"\nNumber of Causal Leave taken: "+cl+"\nNumber of Medical Leave taken: "+ml+"\nNumber of OD's taken: "+od+"\nNumber of Loss of Pay leave taken: "+lp+"\nNumber of days present: "+present+"\nNumber of days absent: "+absent+"\nNumber of Medical leaves that can be taken: "+ml_remaining+"\nNumber of Casual Leaves that can be taken: "+cl_remaining


message = 'Subject: {}\n\n{}'.format(SUBJECT, TEXT)
s.sendmail("thehawkblack00@gmail.com",toaddr,message)
print("Email sent successfully to ",toaddr)

s.quit()
# import smtplib 
# from email.mime.multipart import MIMEMultipart 
# from email.mime.text import MIMEText 
# from email.mime.base import MIMEBase 
# from email import encoders 
   
# fromaddr = "thehawkblack00@gmail.com"
# toaddr = "srishilesh@gmail.com"
   
# # instance of MIMEMultipart 
# msg = MIMEMultipart() 
  
# # storing the senders email address   
# msg['From'] = fromaddr 
  
# # storing the receivers email address  
# msg['To'] = toaddr 
  
# # storing the subject  
# msg['Subject'] = "Subject of the Mail"
  
# # string to store the body of the mail 
# body = "Body_of_the_mail"
  
# # attach the body with the msg instance 
# msg.attach(MIMEText(body, 'plain')) 
  
# # open the file to be sent  
# filename = "DSA.xlsx"
# attachment = open("E:/", "rb") 
  
# # instance of MIMEBase and named as p 
# p = MIMEBase('application', 'octet-stream') 
  
# # To change the payload into encoded form 
# p.set_payload((attachment).read()) 
  
# # encode into base64 
# encoders.encode_base64(p) 
   
# p.add_header('Content-Disposition', "attachment; filename= %s" % filename) 
  
# # attach the instance 'p' to instance 'msg' 
# msg.attach(p) 
  
# # creates SMTP session 
# s = smtplib.SMTP('smtp.gmail.com', 587) 
  
# # start TLS for security 
# s.starttls() 
  
# # Authentication 
# s.login(fromaddr, "phantom19") 
  
# # Converts the Multipart msg into a string 
# text = msg.as_string() 
  
# # sending the mail 
# s.sendmail(fromaddr, toaddr, text) 
  
# # terminating the session 
# s.quit() 

