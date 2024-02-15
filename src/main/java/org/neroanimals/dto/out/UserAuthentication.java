package org.neroanimals.dto.out;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthentication {

    private int id;
    private String username;
    private String accessToken;
    private String refreshToken;
}
