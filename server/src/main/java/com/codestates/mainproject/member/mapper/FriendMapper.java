package com.codestates.mainproject.member.mapper;

import com.codestates.mainproject.member.dto.FriendResponseDto;
import com.codestates.mainproject.member.entity.Friend;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class FriendMapper {

    public FriendResponseDto friendToFriendResponseDto(Friend respondent){
        System.out.println("디버깅");
            FriendResponseDto friendResponseDto = new FriendResponseDto(
                    respondent.getRespondent().getMemberId(),
                    respondent.getRespondent().getDisplayName(),
                    respondent.getRespondent().getMoodList().get(respondent.getRespondent().getMoodList().size() - 1).getMoodPaletteDetails()
            );
            return friendResponseDto;
    }
}
