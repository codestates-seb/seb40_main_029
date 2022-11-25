package com.codestates.mainproject.member.dto;

import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FriendResponseDto {

    private Long respondentId;

    private String respondentDisplayName;

    private MoodPaletteDetails respondentMoodPaletteDetails;
}
