db 만들 때 주의사항~~~~

1. users 테이블
name, email, password로 만들 것!
password의 default는 auth.js 18번 줄과 동일하게 사용하자!(헷갈릴 수 있음)
CREATE TABLE users (
  name char(10) NOT NULL,
  email char(30) NOT NULL PRIMARY KEY,
  password char(255) NOT NULL,
  salt char(255) NOT NULL,
  auth char(20) NOT NULL DEFAULT '직원'
);


2. covid status 테이블
CREATE TABLE covid_status (
  status_research varchar(20) DEFAULT '역조대기' not null,
  status_request varchar(20) DEFAULT '접촉자 없음' not null,
  doctor_name varchar(10) not null,
  researcher_name varchar(10) not null,
  status_research_submit varchar(10) DEFAULT '제출 대기' not null,
  contact_checker_name varchar(10) not null,
  checkbox_end_file int(1) DEFAULT 0,
  checkbox_publicity_submit int(1) DEFAULT 0,
  checkbox_arise_report int(1) DEFAULT 0,
  checkbox_research_register int(1) DEFAULT 0,
  checkbox_notice int(1) DEFAULT 0,
  name_register_notice varchar(10) not null,
  status_home_hospital varchar(5) DEFAULT'home',
  patient_no int(10) not null
  );