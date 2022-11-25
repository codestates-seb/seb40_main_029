package com.codestates.mainproject.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FriendPostDto {

    private String requesterDisplayName;
    private String respondentDisplayName;
}
