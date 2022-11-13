package com.codestates.mainproject.member.mapper;



import com.codestates.mainproject.member.dto.MemberPaletteResponseDto;
import com.codestates.mainproject.member.dto.MemberPatchDto;
import com.codestates.mainproject.member.dto.MemberPostDto;
import com.codestates.mainproject.member.dto.MemberResponseDto;
import com.codestates.mainproject.member.entity.Member;
import com.codestates.mainproject.palette.entity.MemberPalette;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    MemberResponseDto memberToMemberResponseDto(Member member);

    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);

    default List<MemberPaletteResponseDto> memberTomemberPaletteResponseDtos(
            List<MemberPalette> memberPalettes) {
        return memberPalettes
                .stream()
                .map(memberPalette -> MemberPaletteResponseDto
                        .builder()
                        .paletteName(memberPalette.getMoodPalette().getPaletteName())
                        .paletteCode(memberPalette.getMoodPalette().getPaletteCode())
                        .build())
                .collect(Collectors.toList());
    }
}