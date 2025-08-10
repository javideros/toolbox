package com.example.application.security.hilla;

import com.example.application.security.AppUserInfo;
import com.example.application.security.AppUserPrincipal;
import com.example.application.security.CurrentUser;
import com.example.application.security.domain.UserId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;

import java.time.ZoneId;
import java.util.List;
import java.util.Locale;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CurrentUserServiceTest {

    @Mock
    private CurrentUser currentUser;

    @Mock
    private AppUserPrincipal principal;

    @Mock
    private AppUserInfo userInfo;

    private CurrentUserService service;

    @BeforeEach
    void setUp() {
        service = new CurrentUserService(currentUser);
    }

    @Test
    void getUserInfo_returns_user_data() {
        var userId = UserId.of("user-123");

        when(currentUser.requirePrincipal()).thenReturn(principal);
        when(principal.getAppUser()).thenReturn(userInfo);
        when(principal.getAuthorities()).thenReturn(List.of());
        when(userInfo.getUserId()).thenReturn(userId);
        when(userInfo.getPreferredUsername()).thenReturn("john.doe");
        when(userInfo.getFullName()).thenReturn("John Doe");
        when(userInfo.getProfileUrl()).thenReturn("https://example.com/profile");
        when(userInfo.getPictureUrl()).thenReturn("https://example.com/picture.jpg");
        when(userInfo.getEmail()).thenReturn("john@example.com");
        when(userInfo.getZoneId()).thenReturn(ZoneId.of("Europe/Helsinki"));
        when(userInfo.getLocale()).thenReturn(Locale.US);

        var result = service.getUserInfo();

        assertThat(result.userId()).isEqualTo("user-123");
        assertThat(result.preferredUsername()).isEqualTo("john.doe");
        assertThat(result.fullName()).isEqualTo("John Doe");
        assertThat(result.profileUrl()).isEqualTo("https://example.com/profile");
        assertThat(result.pictureUrl()).isEqualTo("https://example.com/picture.jpg");
        assertThat(result.email()).isEqualTo("john@example.com");
        assertThat(result.zoneId()).isEqualTo("Europe/Helsinki");
        assertThat(result.locale()).isEqualTo("en_US");
        assertThat(result.authorities()).isEmpty();
    }

    @Test
    void getUserInfo_handles_null_optional_fields() {
        var userId = UserId.of("user-123");

        when(currentUser.requirePrincipal()).thenReturn(principal);
        when(principal.getAppUser()).thenReturn(userInfo);
        when(principal.getAuthorities()).thenReturn(List.of());
        when(userInfo.getUserId()).thenReturn(userId);
        when(userInfo.getPreferredUsername()).thenReturn("jane.doe");
        when(userInfo.getFullName()).thenReturn("Jane Doe");
        when(userInfo.getProfileUrl()).thenReturn(null);
        when(userInfo.getPictureUrl()).thenReturn(null);
        when(userInfo.getEmail()).thenReturn(null);
        when(userInfo.getZoneId()).thenReturn(ZoneId.of("UTC"));
        when(userInfo.getLocale()).thenReturn(Locale.ENGLISH);

        var result = service.getUserInfo();

        assertThat(result.profileUrl()).isNull();
        assertThat(result.pictureUrl()).isNull();
        assertThat(result.email()).isNull();
        assertThat(result.zoneId()).isEqualTo("UTC");
        assertThat(result.locale()).isEqualTo("en");
    }

    @Test
    void getUserInfo_throws_exception_when_no_authentication() {
        when(currentUser.requirePrincipal())
            .thenThrow(new AuthenticationCredentialsNotFoundException("No authentication"));

        assertThatThrownBy(() -> service.getUserInfo())
            .isInstanceOf(AuthenticationCredentialsNotFoundException.class)
            .hasMessage("No authentication");
    }
}