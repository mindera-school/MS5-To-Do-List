package school.mindera.toDoListAPI.service;


import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.entities.CodesEntity;
import school.mindera.toDoListAPI.entities.UsersEntity;
import school.mindera.toDoListAPI.exceptions.user.*;
import school.mindera.toDoListAPI.model.*;
import school.mindera.toDoListAPI.repositories.CodesRepository;
import school.mindera.toDoListAPI.repositories.UsersRepository;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;

import static java.util.Objects.isNull;

@Service
public class UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final CodesRepository codesRepository;

    // Utils on debug
    Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserService(UsersRepository usersRepository, PasswordEncoder passwordEncoder, CodesRepository codesRepository) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.codesRepository = codesRepository;
    }

    public ResponseEntity<DTOLoggedUser> register(DTORegister register) {
        if (usersRepository.existsByUsername(register.getUsername())) {
            throw new UserAlreadyExistsException("this username is already been used");
        }
        if (usersRepository.existsByEmail(register.getEmail())) {
            throw new UserAlreadyExistsException("this email is already been used");
        }

        UsersEntity newUser = new UsersEntity();
        newUser.setUsername(register.getUsername());
        newUser.setPassword(passwordEncoder.encode(register.getPassword()));
        newUser.setFirstName(register.getFirstName());
        newUser.setLastName(register.getLastName());
        newUser.setEmail(register.getEmail());
        newUser.setTries(0);

        UsersEntity savedUser = usersRepository.save(newUser);

        DTOLoggedUser loggedUser = new DTOLoggedUser();
        loggedUser.setUserId(savedUser.getUserId());
        loggedUser.setUsername(savedUser.getUsername());
        loggedUser.setFirstName(savedUser.getFirstName());
        loggedUser.setLastName(savedUser.getLastName());
        loggedUser.setEmail(savedUser.getEmail());
        loggedUser.setTasksPreviewsURL("/task-previews/" + savedUser.getUserId());

        return ResponseEntity.ok(loggedUser);
    }

    public ResponseEntity<DTOLoggedUser> logIn(DTOLogin login) {
        Optional<UsersEntity> optionalUser = usersRepository.findByUsername(login.getUsername());

        if (optionalUser.isPresent()) {
            logger.info("User Logged");
            UsersEntity user = optionalUser.get();
            if (user.getTries() >= 5) {
                throw new UserLockedException("Too many tries!!!");
            }
            if (passwordEncoder.matches(login.getPassword(), user.getPassword())) {
                DTOLoggedUser loggedUser = new DTOLoggedUser();
                loggedUser.setUserId(user.getUserId());
                loggedUser.setUsername(user.getUsername());
                loggedUser.setFirstName(user.getFirstName());
                loggedUser.setLastName(user.getLastName());
                loggedUser.setEmail(user.getEmail());
                user.setTries(0);
                loggedUser.setTasksPreviewsURL("/task-previews/" + user.getUserId());
                usersRepository.save(user);
                return ResponseEntity.ok(loggedUser);
            }
            user.setTries(user.getTries() + 1);
            usersRepository.save(user);
        }
        throw new UserWrongCredentials("Wrong Credentials");
    }

    public void changeUserProfileImg(Integer userId, DTOChangeImg changeImg) {
        Optional<UsersEntity> user = usersRepository.findById(userId);

        if (user.isEmpty()) {
            throw new InvalidUserException("Invalid user");
        }


        user.get().setProfileImage(changeImg.getProfileImage());

        usersRepository.save(user.get());
    }

    public ResponseEntity<DTOLoggedUser> editUserInfo(Integer userId, DTOEditUser newInfo) {
        Optional<UsersEntity> dbUser = usersRepository.findById(userId);

        if (dbUser.isEmpty()) {
            throw new InvalidUserException("Invalid user");
        }

        if (!isNull(newInfo.getUsername()) && usersRepository.existsByUsername(newInfo.getUsername())) {
            throw new UserAlreadyExistsException("This username is already in use");
        }

        if (StringUtils.isBlank(newInfo.getCurrentPassword())) {
            throw new UsersPasswordIsInvalidException("Password can not be null");
        }

        UsersEntity user = dbUser.get();
        if (!passwordEncoder.matches(newInfo.getCurrentPassword(), user.getPassword())) {
            throw new UserWrongCredentials("Password is wrong!!!");
        }

        if (!isNull(newInfo.getPassword())) {
            newInfo.setPassword(passwordEncoder.encode(newInfo.getPassword()));
        }

        user.update(newInfo);
        usersRepository.save(user);

        return ResponseEntity.ok(Converter.toDTOLogged(user));
    }

    public ResponseEntity<DTOLoggedUser> changePassword(DTOChangePassword dtoChangePassword) {
        Optional<CodesEntity> code = codesRepository.findCodesEntityByCodeIdCode(dtoChangePassword.getToken());

        if (code.isEmpty()) {
            throw new InvalidUserException("Invalid Token");
        }

        CodesEntity codeEntity = code.get();
        if (codeEntity.getExpireDate().before(new Date())) {
            throw new InvalidUserException("Code expired");
        }

        UsersEntity user = codeEntity.getUserId();

        user.setPassword(passwordEncoder.encode(dtoChangePassword.getNewPassword()));
        user.setTries(0);
        usersRepository.save(user);

        return ResponseEntity.ok(Converter.toDTOLogged(user));
    }
}