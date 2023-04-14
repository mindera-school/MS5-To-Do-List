package school.mindera.toDoListAPI.utils;

import org.apache.commons.lang3.RandomStringUtils;

public class CodeGenerator {
    public static String generateToken(){
        return RandomStringUtils.random(6, true, true);
    }
}
