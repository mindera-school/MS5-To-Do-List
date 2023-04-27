package school.mindera.toDoListAPI.service.emailhandler;

public class EmailFactory {

    public static String buildChangePasswordEmail(String token){
        return "<body style=\"display: flex; align-items: center; flex-direction: column; margin: 0\">\n" +
                "    <table style=\"width: 100%\">\n" +
                "        <tr>\n" +
                "            <th style=\"padding: 20px; background-color: #2c5ba1; color: white\">\n" +
                "                <h1>Email Confirmation</h1>\n" +
                "            </th>\n" +
                "        </tr>\n" +
                "        <tr>\n" +
                "            <td style=\"font-size: large; padding: 20px; text-align: center\">\n" +
                "                Seems like you're trying to confirm your email for MS5 ToDo List. If\n" +
                "                this is true, click below to reset your password.\n" +
                "            </td>\n" +
                "        </tr>\n" +
                "        <tr>\n" +
                "            <td style=\"text-align: center; padding: 20px;\">\n" +
                "                <a href=\"http://localhost:3000/MS5-To-Do-List/forgot-password/"+ token +"\" style=\"\n" +
                "                  display: block;\n" +
                "                  background-color: #2c5ba1;\n" +
                "                  border-radius: 15px;\n" +
                "                  width: 200px;\n" +
                "                  height: 25px;\n" +
                "                  text-align: center;\n" +
                "                  padding: 7px 0;\n" +
                "                  line-height: 25px;\n" +
                "                  text-decoration: none;\n" +
                "                  color: white;\n" +
                "                  font-weight: bold;\n" +
                "                  margin: 0 auto;\n" +
                "                \">Click here</a>\n" +
                "            </td>\n" +
                "        </tr>\n" +
                "        <tr>\n" +
                "            <td style=\"font-size: large; padding: 20px; text-align: center\">\n" +
                "                If you did not forgot your password you can safely ignore this email.\n" +
                "            </td>\n" +
                "        </tr>\n" +
                "    </table>\n" +
                "</body>";
    }
}