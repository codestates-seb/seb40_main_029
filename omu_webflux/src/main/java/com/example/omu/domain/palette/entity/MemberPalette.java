//compackage com.example.omu.domain.palette.entity;
//
//import com.codestates.mainproject.member.entity.Member;
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.springframework.data.annotation.Id;
//
//
//@Getter
//@Setter
//@NoArgsConstructor
//public class MemberPalette {
//
//    @Id
//    private Long memberPaletteId;
//
//    @JsonBackReference
//    @ManyToOne
//    private Member member;
//
//    @ManyToOne
//    private MoodPalette moodPalette;
//
//    public MemberPalette(MoodPalette moodPalette) {
//        this.moodPalette = moodPalette;
//    }
//}
