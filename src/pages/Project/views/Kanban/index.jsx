import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Board from 'react-trello'
import makeStyles from '@mui/styles/makeStyles';
import Avatar from "@mui/material/Avatar";
import defaultProfile from "assets/images/user1.svg";
import attach from "assets/images/icons/attach.png";
import check from "assets/images/icons/check.png";
import message from "assets/images/icons/message.png";

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Not Started',
      style: { backgroundColor: '#25165B' },  
      cardStyle: { backgroundColor: '#FFFFFF' } ,
      cards: [
        {id: 'Card1', 
        title: 
        "Campaign Summary - Concept 4 Testing"
        ,
         description:  
         <div className="w100">
          <div className="dflex-evenly">
            <div>
              <img src={check} className="kanban-icon" alt="check"/>
              <span>0/17</span>
            </div>
            <div>
              <img src={attach} className="kanban-icon" alt="attach"/>
              <span>0/17</span>
            </div>
            <div>
              <img src={message} className="kanban-icon" alt="message"/>
              <span>0/17</span>
            </div>
          </div>
          <div className="dflex-end">
            <Avatar alt="Travis Howard" src={defaultProfile} />
          </div>
         </div>,
         
         draggable: true},
        {id: 'Card2', title: 'Campaign Summary - Concept 4 Testing',
         description: 
          <div className="w100">
            <div className="dflex-evenly">
              <div>
                <img src={check} className="kanban-icon" alt="check"/>
                <span>0/17</span>
              </div>
              <div>
                <img src={attach} className="kanban-icon" alt="attach"/>
                <span>0/17</span>
              </div>
              <div>
                <img src={message} className="kanban-icon" alt="message"/>
                <span>0/17</span>
              </div>
            </div>
            <div className="dflex-end">
              <Avatar alt="Travis Howard" src={defaultProfile} />
            </div>
          </div>
         , metadata: {sha: 'be312a1'}}
      ]
    },

    {
      id: 'lane2',
      title: 'In Progress',
      style: { backgroundColor: '#1ABC00' },  
      cardStyle: { backgroundColor: '#FFFFFF' } ,
      cards: [
        {id: 'Card3', 
        title: 
        "Campaign Summary - Concept 4 Testing"
        ,
         description:  
         <div className="w100">
          <div className="dflex-evenly">
            <div>
              <img src={check} className="kanban-icon" alt="check"/>
              <span>0/17</span>
            </div>
            <div>
              <img src={attach} className="kanban-icon" alt="attach"/>
              <span>0/17</span>
            </div>
            <div>
              <img src={message} className="kanban-icon" alt="message"/>
              <span>0/17</span>
            </div>
          </div>
          <div className="dflex-end">
            <Avatar alt="Travis Howard" src={defaultProfile} />
          </div>
         </div>,
         
         draggable: true},
        {id: 'Card4', title: 'Campaign Summary - Concept 4 Testing',
         description: 
          <div className="w100">
            <div className="dflex-evenly">
              <div>
                <img src={check} className="kanban-icon" alt="check"/>
                <span>0/17</span>
              </div>
              <div>
                <img src={attach} className="kanban-icon" alt="attach"/>
                <span>0/17</span>
              </div>
              <div>
                <img src={message} className="kanban-icon" alt="message"/>
                <span>0/17</span>
              </div>
            </div>
            <div className="dflex-end">
              <Avatar alt="Travis Howard" src={defaultProfile} />
            </div>
          </div>
         , metadata: {sha: '1'}}
      ]
    },

    {
      id: 'lane3',
      title: 'Testing',
      style: { backgroundColor: '#A03DC1' },  
      cardStyle: { backgroundColor: '#FFFFFF' } ,
      cards: []
    },
    {
      id: 'lane4',
      title: 'Awaiting Feedback',
      style: { backgroundColor: '#F6C269' },  
      cardStyle: { backgroundColor: '#FFFFFF' } ,
      cards: []
    },
   
  ]
}



const useStyles = makeStyles({
  boardContainer : {
    padding:'20px 10px !important' 
  },
  w100: {
    width:'100%'
  }
  
});


const Kanban = () => {
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <Box width="100%" height="100vh">
       <Board  data={data} >
       </Board>
    </Box>
  );
};

export default Kanban;
