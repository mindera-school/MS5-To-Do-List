package school.mindera.toDoListAPI.service.emailhandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.model.DTOChangePasswordEmail;
import school.mindera.toDoListAPI.utils.CodeGenerator;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailSenderService {

    private final String todoEmail = System.getenv("TODO-EMAIL");

    @Autowired
    private JavaMailSender mailSender;
    private final CodesService codesService;

    public EmailSenderService(CodesService codesService) {
        this.codesService = codesService;
    }

    public ResponseEntity<Object> sendEmail(DTOChangePasswordEmail toEmail) {

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setTo(toEmail.getEmail());
            mimeMessageHelper.setFrom(todoEmail);
            mimeMessageHelper.setSubject("MS5 todoList Email confirmation");
            String token = codesService.createNewChangePasswordAttempt(toEmail.getEmail());

            mimeMessageHelper.setText(EmailFactory.buildChangePasswordEmail(token), true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }


        mailSender.send(mimeMessage);
        return ResponseEntity.ok().build();
    }

}
