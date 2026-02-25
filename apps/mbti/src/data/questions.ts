export interface Question {
  id: number;
  text: string;
  category: 'EI' | 'SN' | 'TF' | 'JP';
  options: {
    text: string;
    value: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  }[];
  isQuickScan: boolean;
}

export const questions: Question[] = [
  // EI 지표
  {
    id: 1,
    text: "주말에 집에서 쉬는 것보다 친구들을 만나 에너지를 얻는 편인가요?",
    category: 'EI',
    options: [
      { text: "그렇다 (친구들과 시끌벅적하게!)", value: 'E' },
      { text: "아니다 (혼자 조용히 충전하는 게 좋아)", value: 'I' }
    ],
    isQuickScan: true
  },
  {
    id: 2,
    text: "새로운 사람을 만나는 자리에서 먼저 말을 거는 편인가요?",
    category: 'EI',
    options: [
      { text: "먼저 다가가서 말을 건넨다", value: 'E' },
      { text: "상대방이 먼저 말을 걸 때까지 기다린다", value: 'I' }
    ],
    isQuickScan: false
  },
  {
    id: 3,
    text: "생각을 말로 표현하면서 정리하는 편인가요?",
    category: 'EI',
    options: [
      { text: "말로 하면서 생각이 정리된다", value: 'E' },
      { text: "충분히 생각한 후에 입을 연다", value: 'I' }
    ],
    isQuickScan: true
  },
  // SN 지표
  {
    id: 11,
    text: "사과하면 어떤 생각이 먼저 드나요?",
    category: 'SN',
    options: [
      { text: "빨갛고 맛있는 과일", value: 'S' },
      { text: "백설공주, 뉴턴, 아이폰 등 연상되는 아이디어들", value: 'N' }
    ],
    isQuickScan: true
  },
  {
    id: 12,
    text: "새로운 기기를 샀을 때 설명서를 정독하시나요?",
    category: 'SN',
    options: [
      { text: "설명서를 꼼꼼히 읽어본다", value: 'S' },
      { text: "일단 이것저것 만져보며 감으로 익힌다", value: 'N' }
    ],
    isQuickScan: false
  },
  {
    id: 13,
    text: "미래의 가능성보다 현재의 실질적인 해결책이 더 중요한가요?",
    category: 'SN',
    options: [
      { text: "현실적인 대안이 우선이다", value: 'S' },
      { text: "미래를 내다본 창의적인 아이디어가 우선이다", value: 'N' }
    ],
    isQuickScan: true
  },
  // TF 지표
  {
    id: 21,
    text: "친구가 '나 오늘 우울해서 쇼핑했어'라고 했을 때 나의 대답은?",
    category: 'TF',
    options: [
      { text: "뭐 샀어? (궁금함)", value: 'T' },
      { text: "왜 우울해? 무슨 일 있었어? (공감)", value: 'F' }
    ],
    isQuickScan: true
  },
  {
    id: 22,
    text: "결과보다 과정이 더 중요하다고 생각하시나요?",
    category: 'TF',
    options: [
      { text: "결과가 좋아야 의미가 있다", value: 'T' },
      { text: "과정이 즐겁고 의미 있어야 한다", value: 'F' }
    ],
    isQuickScan: false
  },
  {
    id: 23,
    text: "누군가에게 조언할 때 객관적인 사실을 강조하는 편인가요?",
    category: 'TF',
    options: [
      { text: "냉철한 분석과 해결방법을 제시한다", value: 'T' },
      { text: "상대방의 기분을 배려하며 따뜻하게 말한다", value: 'F' }
    ],
    isQuickScan: true
  },
  // JP 지표
  {
    id: 31,
    text: "여행을 갈 때 시간표를 꼼꼼히 짜는 편인가요?",
    category: 'JP',
    options: [
      { text: "시간별로 상세하게 계획을 세운다", value: 'J' },
      { text: "가서 끌리는 대로 움직이는 게 진정한 여행이다", value: 'P' }
    ],
    isQuickScan: true
  },
  {
    id: 32,
    text: "책상 위나 방 안이 항상 정리되어 있는 편인가요?",
    category: 'JP',
    options: [
      { text: "물건이 제자리에 있어야 마음이 편하다", value: 'J' },
      { text: "조금 어지러워 보이더라도 나만의 질서가 있다", value: 'P' }
    ],
    isQuickScan: false
  },
  {
    id: 33,
    text: "마감 기한이 닥치기 전에 미리 끝내놓는 편인가요?",
    category: 'JP',
    options: [
      { text: "불안해서 미리미리 처리해둔다", value: 'J' },
      { text: "마지막 순간에 초인적인 힘이 발휘된다", value: 'P' }
    ],
    isQuickScan: true
  }
];
