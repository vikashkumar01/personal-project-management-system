package com.example.pma.PM.Controller;

import com.example.pma.PM.Dto.LoginRequest;
import com.example.pma.PM.Dto.LoginResponse;
import com.example.pma.PM.Exception.InvalidCredentails;
import com.example.pma.PM.Model.User;
import com.example.pma.PM.Repository.UserRepository;
import com.example.pma.PM.SecurityConfig.JWTHelper;
import com.example.pma.PM.Services.CustomUserDetailService;
import com.example.pma.PM.Services.MapValidationErrorService;
import com.example.pma.PM.Services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTHelper jwtHelper;

    @PostMapping("/user/register")
    public ResponseEntity<?> CreateUser(@Valid @RequestBody User user, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        User cuser  = userService.createUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);

    }

    @PostMapping("/user/login")
    public ResponseEntity<LoginResponse> LoginUser(@Valid @RequestBody LoginRequest user,
                                                   BindingResult result,
                                                   HttpServletResponse response,
                                                   HttpServletRequest request){

        doAuthentication(user.getEmail(),user.getPassword());

        UserDetails userDetails = customUserDetailService.loadUserByUsername(user.getEmail());

        String token = jwtHelper.generateToken(userDetails);

        LoginResponse res = new LoginResponse();

        res.setToken(token);

        return new ResponseEntity<LoginResponse>(res,HttpStatus.OK);

    }

    private void doAuthentication(String email, String password){
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,password);
        try{
            authenticationManager.authenticate(authentication);
        }catch(BadCredentialsException e){
            throw new InvalidCredentails("Invalid Credentails");
        }
    }

    @DeleteMapping("/user/deleteuser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId){

        userService.deleteUser(userId);
        return new ResponseEntity<String>("User Deleted Successfully",HttpStatus.OK);
    }

    @GetMapping("/user/current-user")
    public ResponseEntity<User> getLoggedInUser(){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String email = null;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        User u = userRepository.findByEmail(email);

        return new ResponseEntity<User>(u,HttpStatus.OK);
    }

    @GetMapping("/user/logout")
    public ResponseEntity<String> logoutUser(HttpServletResponse response){

        SecurityContextHolder.clearContext();
        return new ResponseEntity<String>("User logout Successfully",HttpStatus.OK);
    }
}
