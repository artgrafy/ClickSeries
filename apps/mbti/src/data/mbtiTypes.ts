export interface MBTIType {
    type: string;
    title: string;
    description: string;
    keywords: string[];
    imageUrl?: string;
    color?: string;
    charIdx?: number;
}

export const mbtiResults: Record<string, MBTIType> = {
    ISTJ: {
        type: "ISTJ",
        title: "청렴결백한 논리주의자",
        description: "사실에 근거하여 사고하며 결정을 내릴 때 주저함이 없습니다. 전통과 질서를 중시합니다.",
        keywords: ["책임감", "현실적", "철저함"],
        color: "from-blue-500 to-cyan-600",
        charIdx: 2
    },
    ISFJ: {
        type: "ISFJ",
        title: "용감한 수호자",
        description: "타인을 보호하고 돕는 일에 헌신적이며, 조용하지만 강한 내면을 가지고 있습니다.",
        keywords: ["헌신적", "세심함", "온화함"],
        color: "from-green-400 to-emerald-500",
        charIdx: 3
    },
    INFJ: {
        type: "INFJ",
        title: "선의의 옹호자",
        description: "가장 흔치 않은 성격 유형으로, 인내심이 강하고 통찰력이 뛰어나며 대의를 중시합니다.",
        keywords: ["통찰력", "공감력", "신중함"],
        color: "from-indigo-400 to-purple-500",
        charIdx: 0
    },
    INTJ: {
        type: "INTJ",
        title: "용의주도한 전략가",
        description: "상상력이 풍부하면서도 결단력이 있으며, 야망이 있지만 겉으로 드러내지 않습니다.",
        keywords: ["전략적", "독립적", "논리적"],
        color: "from-violet-500 to-fuchsia-600",
        charIdx: 0
    },
    ISTP: {
        type: "ISTP",
        title: "만능 재주꾼",
        description: "냉철한 이성과 왕성한 호기심을 바탕으로 직접 만지고 탐구하는 것을 좋아합니다.",
        keywords: ["적응력", "낙천적", "분석적"],
        color: "from-slate-400 to-gray-600",
        charIdx: 10
    },
    ISFP: {
        type: "ISFP",
        title: "호기심 많은 예술가",
        description: "새로운 것을 시도할 준비가 되어 있는 유연하고 매력적인 성격의 소유자입니다.",
        keywords: ["겸손함", "온화함", "관대함"],
        color: "from-yellow-400 to-orange-500",
        charIdx: 3
    },
    INFP: {
        type: "INFP",
        title: "열정적인 중재자",
        description: "최악의 상황에서도 희망을 잃지 않는 선하며 이타적인 마음을 가지고 있습니다.",
        keywords: ["이상주의", "공감력", "부드러움"],
        color: "from-teal-400 to-emerald-500",
        charIdx: 5
    },
    INTP: {
        type: "INTP",
        title: "논리적인 사색가",
        description: "끊임없이 새로운 지식을 갈구하며, 혁신적인 아이디어와 비전을 제시합니다.",
        keywords: ["객관적", "지적호기심", "창의적"],
        color: "from-cyan-500 to-blue-600",
        charIdx: 11
    },
    ESTP: {
        type: "ESTP",
        title: "모험을 즐기는 사업가",
        description: "벼랑 끝에 서 있는 아슬아슬한 삶을 즐기며, 명석한 두뇌와 감각적인 에너지를 가졌습니다.",
        keywords: ["자신감", "행동력", "현실적"],
        color: "from-orange-500 to-red-600",
        charIdx: 8
    },
    ESFP: {
        type: "ESFP",
        title: "자유로운 영혼의 연예인",
        description: "주위 사람들을 즐겁게 하며 에너지가 넘치고, 순간의 즐거움을 중시합니다.",
        keywords: ["사교적", "낙천적", "열정적"],
        color: "from-pink-400 to-rose-500",
        charIdx: 5
    },
    ENFP: {
        type: "ENFP",
        title: "재기발랄한 활동가",
        description: "창의적이며 자유로운 영혼으로, 사람들과 정서적으로 교감하는 것을 좋아합니다.",
        keywords: ["상상력", "열정적", "사교적"],
        color: "from-lime-400 to-green-500",
        charIdx: 1
    },
    ENTP: {
        type: "ENTP",
        title: "뜨거운 논쟁을 즐기는 변론가",
        description: "지적인 도전을 두려워하지 않으며, 기존의 관념을 뒤집는 새로운 발상을 선호합니다.",
        keywords: ["언변", "다재다능", "혁신적"],
        color: "from-amber-400 to-orange-600",
        charIdx: 13
    },
    ESTJ: {
        type: "ESTJ",
        title: "엄격한 관리자",
        description: "사물이나 사람을 관리하는 데 타의 추종을 불허하며 뛰어난 조직 능력을 발휘합니다.",
        keywords: ["체계적", "규율", "현실적"],
        color: "from-blue-600 to-indigo-700",
        charIdx: 2
    },
    ESFJ: {
        type: "ESFJ",
        title: "사교적인 외교관",
        description: "타인을 돕는 데 관심이 많고, 협력을 중시하며 세심한 배려를 아끼지 않습니다.",
        keywords: ["배려심", "협력", "사교적"],
        color: "from-sky-400 to-blue-500",
        charIdx: 15
    },
    ENFJ: {
        type: "ENFJ",
        title: "정의로운 사회운동가",
        description: "넘치는 카리스마와 열정을 가진 리더로, 타인을 고취시키고 이끌어갑니다.",
        keywords: ["카리스마", "리더십", "이타적"],
        color: "from-orange-400 to-pink-500",
        charIdx: 1
    },
    ENTJ: {
        type: "ENTJ",
        title: "대담한 통치자",
        description: "자신감 넘치고 강력한 의지를 가지고 있으며, 목표 달성을 위해 계획을 설계합니다.",
        keywords: ["결단력", "추진력", "전략적"],
        color: "from-purple-600 to-indigo-800",
        charIdx: 0
    }
};
