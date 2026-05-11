// 10문항 5지선다 설문 데이터
import type { Question } from "@/types/result";

export const questions: Question[] = [
  {
    id: "q1",
    question: "새로운 팀 프로젝트를 시작할 때 나는?",
    options: [
      { id: "q1_ceo", text: "팀 목표를 정하고 친구들이 잘 움직이도록 돕고 싶다", type: "CEO" },
      { id: "q1_cpo", text: "어떤 문제를 해결할지 먼저 정리하고 싶다", type: "CPO" },
      { id: "q1_cto", text: "직접 만들어 보면서 아이디어를 확인하고 싶다", type: "CTO" },
      { id: "q1_cmo", text: "사람들이 관심 가질 만한 이름이나 소개 방법을 생각하고 싶다", type: "CMO" },
      { id: "q1_coo", text: "준비물, 시간, 역할을 꼼꼼하게 정리하고 싶다", type: "COO" },
    ],
  },
  {
    id: "q2",
    question: "창업 아이디어를 정할 때 가장 중요하다고 생각하는 것은?",
    options: [
      { id: "q2_ceo", text: "팀이 같은 목표를 보고 함께 움직이는 것", type: "CEO" },
      { id: "q2_cpo", text: "진짜 불편한 문제를 찾아내는 것", type: "CPO" },
      { id: "q2_cto", text: "실제로 작동하는 제품이나 서비스를 만드는 것", type: "CTO" },
      { id: "q2_cmo", text: '사람들이 "이거 좋아 보인다"고 느끼게 만드는 것', type: "CMO" },
      { id: "q2_coo", text: "돈, 시간, 준비물을 낭비하지 않는 것", type: "COO" },
    ],
  },
  {
    id: "q3",
    question: "친구들과 의견이 다를 때 나는?",
    options: [
      { id: "q3_ceo", text: "서로의 의견을 듣고 최종 방향을 정하려고 한다", type: "CEO" },
      { id: "q3_cpo", text: "왜 의견이 다른지 차분히 정리한다", type: "CPO" },
      { id: "q3_cto", text: "말로만 하지 말고 한번 실험해 보자고 한다", type: "CTO" },
      { id: "q3_cmo", text: "분위기를 풀고 친구들이 다시 말할 수 있게 돕는다", type: "CMO" },
      { id: "q3_coo", text: "정해진 시간 안에 결정할 수 있도록 정리한다", type: "COO" },
    ],
  },
  {
    id: "q4",
    question: "내가 가장 자신 있는 활동은?",
    options: [
      { id: "q4_ceo", text: "팀을 대표해서 발표하거나 결정을 이끄는 것", type: "CEO" },
      { id: "q4_cpo", text: "복잡한 생각을 보기 쉽게 정리하는 것", type: "CPO" },
      { id: "q4_cto", text: "만들기, 코딩, 실험, 시제품 제작", type: "CTO" },
      { id: "q4_cmo", text: "발표 자료, 디자인, 영상, 홍보 문구 만들기", type: "CMO" },
      { id: "q4_coo", text: "일정표, 예산표, 체크리스트 정리하기", type: "COO" },
    ],
  },
  {
    id: "q5",
    question: "창업팀에서 내가 맡고 싶은 역할은?",
    options: [
      { id: "q5_ceo", text: "팀을 이끌고 전체 방향을 정하는 역할", type: "CEO" },
      { id: "q5_cpo", text: "아이디어와 사업 계획을 만드는 역할", type: "CPO" },
      { id: "q5_cto", text: "앱, 웹, 제품, 모형을 만드는 역할", type: "CTO" },
      { id: "q5_cmo", text: "브랜드, 광고, 발표를 맡는 역할", type: "CMO" },
      { id: "q5_coo", text: "돈, 일정, 자료, 준비물을 관리하는 역할", type: "COO" },
    ],
  },
  {
    id: "q6",
    question: "발표 준비를 할 때 나는?",
    options: [
      { id: "q6_ceo", text: "누가 어떤 부분을 맡을지 정한다", type: "CEO" },
      { id: "q6_cpo", text: "발표 순서와 핵심 내용을 정리한다", type: "CPO" },
      { id: "q6_cto", text: "보여줄 시제품이나 화면이 잘 되는지 확인한다", type: "CTO" },
      { id: "q6_cmo", text: "발표 문장과 디자인을 더 멋지게 만든다", type: "CMO" },
      { id: "q6_coo", text: "발표 시간, 제출 자료, 준비물을 확인한다", type: "COO" },
    ],
  },
  {
    id: "q7",
    question: "문제가 생겼을 때 나의 행동은?",
    options: [
      { id: "q7_ceo", text: "팀원들을 모아 해결 방향을 정한다", type: "CEO" },
      { id: "q7_cpo", text: "문제를 작은 부분으로 나누어 원인을 찾는다", type: "CPO" },
      { id: "q7_cto", text: "여러 방법을 직접 해보며 해결책을 찾는다", type: "CTO" },
      { id: "q7_cmo", text: "친구들에게 설명하고 도움을 구한다", type: "CMO" },
      { id: "q7_coo", text: "빠진 것이 없는지 체크리스트로 확인한다", type: "COO" },
    ],
  },
  {
    id: "q8",
    question: "내가 가장 재미있게 느끼는 창업 활동은?",
    options: [
      { id: "q8_ceo", text: "팀을 대표해서 의사결정하기", type: "CEO" },
      { id: "q8_cpo", text: "고객의 불편함을 조사하고 아이디어 만들기", type: "CPO" },
      { id: "q8_cto", text: "제품, 앱, 웹페이지, 모형 만들기", type: "CTO" },
      { id: "q8_cmo", text: "이름, 로고, 광고, 발표 자료 만들기", type: "CMO" },
      { id: "q8_coo", text: "가격, 예산, 일정, 역할표 정리하기", type: "COO" },
    ],
  },
  {
    id: "q9",
    question: "친구들이 나를 설명한다면?",
    options: [
      { id: "q9_ceo", text: '"팀을 잘 이끌어 주는 친구"', type: "CEO" },
      { id: "q9_cpo", text: '"생각을 잘 정리하는 친구"', type: "CPO" },
      { id: "q9_cto", text: '"무언가를 잘 만들어 내는 친구"', type: "CTO" },
      { id: "q9_cmo", text: '"말과 표현을 잘하는 친구"', type: "CMO" },
      { id: "q9_coo", text: '"꼼꼼하고 책임감 있는 친구"', type: "COO" },
    ],
  },
  {
    id: "q10",
    question: "창업 발표회 마지막 날, 내가 가장 잘할 수 있는 일은?",
    options: [
      { id: "q10_ceo", text: "팀 전체를 점검하고 마지막 결정을 내리는 일", type: "CEO" },
      { id: "q10_cpo", text: "발표 내용과 사업 아이디어를 정리하는 일", type: "CPO" },
      { id: "q10_cto", text: "시제품이나 웹페이지가 잘 작동하는지 확인하는 일", type: "CTO" },
      { id: "q10_cmo", text: "발표 자료와 홍보 문구를 멋지게 완성하는 일", type: "CMO" },
      { id: "q10_coo", text: "제출 자료, 시간, 준비물을 최종 확인하는 일", type: "COO" },
    ],
  },
];
