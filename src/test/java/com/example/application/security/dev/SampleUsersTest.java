package com.example.application.security.dev;

import com.example.application.security.AppRoles;
import com.example.application.security.domain.UserId;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import static org.assertj.core.api.Assertions.assertThat;

class SampleUsersTest {

    @Test
    void admin_user_has_correct_properties() {
        var admin = SampleUsers.ADMIN;
        
        assertThat(admin.getUsername()).isEqualTo(SampleUsers.ADMIN_USERNAME);
        assertThat(admin.getAppUser().getUserId()).isEqualTo(SampleUsers.ADMIN_ID);
        assertThat(admin.getAppUser().getFullName()).isEqualTo("Alice Administrator");
        assertThat(admin.getAppUser().getEmail()).isEqualTo("alice@example.com");
        assertThat(admin.getAuthorities()).hasSize(2)
            .extracting(GrantedAuthority::getAuthority)
            .contains("ROLE_" + AppRoles.ADMIN, "ROLE_" + AppRoles.USER);
    }

    @Test
    void user_has_correct_properties() {
        var user = SampleUsers.USER;
        
        assertThat(user.getUsername()).isEqualTo(SampleUsers.USER_USERNAME);
        assertThat(user.getAppUser().getUserId()).isEqualTo(SampleUsers.USER_ID);
        assertThat(user.getAppUser().getFullName()).isEqualTo("Ursula User");
        assertThat(user.getAppUser().getEmail()).isEqualTo("ursula@example.com");
        assertThat(user.getAuthorities()).hasSize(1)
            .extracting(GrantedAuthority::getAuthority)
            .contains("ROLE_" + AppRoles.USER);
    }

    @Test
    void user_ids_are_valid() {
        assertThat(SampleUsers.ADMIN_ID).isInstanceOf(UserId.class);
        assertThat(SampleUsers.USER_ID).isInstanceOf(UserId.class);
        assertThat(SampleUsers.ADMIN_ID).isNotEqualTo(SampleUsers.USER_ID);
    }

    @Test
    void all_users_list_contains_both_users() {
        assertThat(SampleUsers.ALL_USERS)
            .hasSize(2)
            .containsExactly(SampleUsers.USER, SampleUsers.ADMIN);
    }

    @Test
    void all_users_list_is_immutable() {
        assertThat(SampleUsers.ALL_USERS).isUnmodifiable();
    }

    @Test
    void users_have_encoded_passwords() {
        assertThat(SampleUsers.ADMIN.getPassword()).isNotEqualTo("123");
        assertThat(SampleUsers.USER.getPassword()).isNotEqualTo("123");
        assertThat(SampleUsers.ADMIN.getPassword()).startsWith("{");
        assertThat(SampleUsers.USER.getPassword()).startsWith("{");
    }
}