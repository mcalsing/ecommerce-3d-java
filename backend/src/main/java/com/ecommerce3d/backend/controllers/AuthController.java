package com.ecommerce3d.backend.controllers;

import com.ecommerce3d.backend.dtos.AuthDTO;
import com.ecommerce3d.backend.dtos.LoginResponseDTO;
import com.ecommerce3d.backend.dtos.RegisterDTO;
import com.ecommerce3d.backend.infra.TokenService;
import com.ecommerce3d.backend.models.User;
import com.ecommerce3d.backend.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;

  private final UserRepository userRepository;

  private final TokenService tokenService;

  public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, TokenService tokenService) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  @PostMapping("/login")
  public ResponseEntity login(@RequestBody AuthDTO dto){
    var emailPassword = new UsernamePasswordAuthenticationToken(dto.email(), dto.password());
    var auth = this.authenticationManager.authenticate(emailPassword);

      // para retornar somente o token
//    var token = tokenService.generateToken((User) auth.getPrincipal());
//    return ResponseEntity.ok(new LoginResponseDTO(token));

    // para retornar outros dados do usuário
    User user = (User) auth.getPrincipal();
    String token = tokenService.generateToken(user);

    return ResponseEntity.ok(
            new LoginResponseDTO(
                    token,
                    user.getEmail(),
                    user.getName()
            )
    );
  }

  @PostMapping("/register")
  public ResponseEntity register(@RequestBody RegisterDTO dto){
    if (this.userRepository.findByEmail(dto.email()).isPresent()) {
      return ResponseEntity.badRequest().body("Email já cadastrado");
    }

    String cryptedPassword = new BCryptPasswordEncoder().encode(dto.password());
    User newUser = new User(cryptedPassword, dto.email(), dto.name(),  dto.role());

    this.userRepository.save(newUser);
    return ResponseEntity.ok().build();
  }
}
