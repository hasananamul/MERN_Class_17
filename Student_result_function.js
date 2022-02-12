function StudentsResult() {
  this.gpaGrade = function (subject) {
    let gpa;
    let grade;
    if (subject >= 0 && subject <= 32) {
      gpa = 0;
      grade = "F";
    } else if (subject >= 33 && subject <= 39) {
      gpa = 1;
      grade = "D";
    } else if (subject >= 40 && subject <= 49) {
      gpa = 2;
      grade = "C";
    } else if (subject >= 50 && subject <= 59) {
      gpa = 3;
      grade = "B";
    } else if (subject >= 60 && subject <= 69) {
      gpa = 3.5;
      grade = "A-";
    } else if (subject >= 70 && subject <= 79) {
      gpa = 4;
      grade = "A";
    } else if (subject >= 80 && subject <= 100) {
      gpa = 5;
      grade = "A+";
    } else if (subject > 100) {
      gpa = "invalid";
      grade = "Invalid";
    }
    return {
      gpa,
      grade,
    };
  };
  this.totalResult = function (b, e, mth, ss, s, eco) {
    let cgpa;
    let totalGrade;
    let totalGpa =
      this.gpaGrade(b).gpa +
      this.gpaGrade(e).gpa +
      this.gpaGrade(mth).gpa +
      this.gpaGrade(ss).gpa +
      this.gpaGrade(s).gpa +
      this.gpaGrade(eco).gpa;
    cgpa = totalGpa / 6;

    if (b < 33 || e < 33 || mth < 33 || ss < 33 || s < 33 || eco < 33) {
      totalGrade = "F";
    } else if (cgpa >= 0 && cgpa < 1) {
      totalGrade = "You are failed!!!";
    } else if (cgpa >= 1 && cgpa < 2) {
      totalGrade = "D";
    } else if (cgpa >= 2 && cgpa < 3.5) {
      totalGrade = "B";
    } else if (cgpa >= 3.5 && cgpa < 4) {
      totalGrade = "A-";
    } else if (cgpa >= 4 && cgpa < 5) {
      totalGrade = "A";
    } else if (cgpa >= 5) {
      totalGrade = "A+";
    }
    return {
      cgpa: totalGrade == "F" ? 0 : cgpa,
      totalGrade:
        totalGrade == "F"
          ? ` <p class="text-danger">You are failed</p>`
          : totalGrade,
    };
  };
}
