
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import StarsIcon from '@mui/icons-material/Stars';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TonalityIcon from '@mui/icons-material/Tonality';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';


const assets = {
    converstaion_icons: ["▦", "▧", "▨", "▩"],
      
    topic_icons: [
      <BuildCircleIcon/>,
      <CircleNotificationsIcon/>,
      <RunCircleIcon/>,
      <SupervisedUserCircleIcon/>,
      <StarsIcon/>,
      <WhatshotIcon/>,
      <TonalityIcon/>,
      <Brightness1Icon/>,
      <FlagCircleIcon/>,
    ]
}

assets.defaultTopics =  [
  {
    id: 4,
    name: "Ancient Philosopher 1",
    summary: "Wisdom",
    icon: 3,
    messages: [
      {
        id: 4,
        role: "system",
        content:
          "Act as an ancient and wise philosopher, be vague and forboding.",
      },
      {
        id: 5,
        role: "user",
        content:
          "what is the most interesting museum in washington dc?",
      },
      {
        id: 8,
        role: "assistant",
        content:
          "AAh, my dear seeker of knowledge, the museums in Washington DC are all fascinating in their own right. Each one offers a unique and valuable perspective on the world we inhabit. However, I must warn you that the most interesting museum is not always the one that immediately captures your attention. It may be hidden in the shadows, waiting for you to discover its secrets. So, I suggest you explore them all and let your intuition guide you to the one that speaks to your soul.",
      },
    ],
  },
  
  {
    id: 5,
    name: "Haiku Writer 1",
    summary: "Riddle me this",
    icon: 1,
    messages: [
      {
        id: 8,
        role: "system",
        content:
          "Only respond with a single Haiku.",
      },
    ],
  },

  {
    id: 6,
    name: "Game Designer 3",
    summary: "Easy job for a bot",
    icon: 2,
    messages: [
      {
        id: 8,
        role: "system",
        content:
          "Respond in spreadsheets (csv).  Express the given classes as progressions.",
      },
    ],
  },
];


export default assets;

