package com.codestates.mainproject.member.mapper;

import com.codestates.mainproject.member.dto.FriendResponseDto;
import com.codestates.mainproject.member.dto.MemberResponseDto;
import com.codestates.mainproject.member.entity.Friend;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.palette.entity.MoodPaletteDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class FriendMapper {

    public FriendResponseDto friendToFriendResponseDto(Friend respondent){
        System.out.println("디버깅");
            FriendResponseDto friendResponseDto1 = new FriendResponseDto(
                    respondent.getRespondent().getMemberId(),
                    respondent.getRespondent().getDisplayName(),
                    null
            );

            FriendResponseDto friendResponseDto2 = new FriendResponseDto(
                    respondent.getRespondent().getMemberId(),
                    respondent.getRespondent().getDisplayName(),
                    respondent.getRespondent().getMoodList().get(respondent.getRespondent().getMoodList().size() - 1).getMoodPaletteDetails()
            );

        if(respondent.getRespondent().getMoodList().get(respondent.getRespondent().getMoodList().size() - 1) == null){
            return  friendResponseDto1;
        } else  return friendResponseDto2;
    }

    public List<FriendResponseDto> friendsToFridndResponseDtos(List<Friend> friends) {

        List<FriendResponseDto> friendResponseDtos = new ArrayList<>();
        for(int i=0; i < friends.size(); i++) {

            friendResponseDtos.add(new FriendResponseDto(
                    friends.get(i).getRespondent().getMemberId(),
                    friends.get(i).getRespondent().getDisplayName(),
                    friends.get(i).getRespondent().getMoodList().get(friends.get(i).getRespondent().getMoodList().size()-1).getMoodPaletteDetails()
            ));
        }
        return friendResponseDtos;
    }
}
