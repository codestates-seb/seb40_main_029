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
        MoodPaletteDetails moodPaletteDetails = null;

        if(respondent.getRespondent().getMoodList().size() == 0){ // 친구가 무드 추가를 안했으면 moodList의 사이즈가 0 --> moodPaletteDetails에 null값 등록
            moodPaletteDetails = null;
            } else  moodPaletteDetails = respondent.getRespondent().getMoodList().get(respondent.getRespondent().getMoodList().size() - 1).getMoodPaletteDetails(); // 친구의 무드 정보가 등록되어 있을 경우 친구의 무드정보를 등록

            FriendResponseDto friendResponseDto = new FriendResponseDto(
                    respondent.getRespondent().getMemberId(),
                    respondent.getRespondent().getDisplayName(),
                    moodPaletteDetails
            );
        return friendResponseDto;
    }

    public List<FriendResponseDto> friendsToFridndResponseDtos(List<Friend> friends) {


        List<FriendResponseDto> friendResponseDtos = new ArrayList<>();
        MoodPaletteDetails moodPaletteDetails = null;
        for(int i=0; i < friends.size(); i++) {

            if(friends.get(i).getRespondent().getMoodList().size() == 0){
                 moodPaletteDetails = null;
            } else {
                 moodPaletteDetails = friends.get(i).getRespondent().getMoodList().get(friends.get(i).getRespondent().getMoodList().size()-1).getMoodPaletteDetails();
            }
            friendResponseDtos.add(new FriendResponseDto(
                    friends.get(i).getRespondent().getMemberId(),
                    friends.get(i).getRespondent().getDisplayName(),
                    moodPaletteDetails
            ));
        }
        return friendResponseDtos;
    }
}
