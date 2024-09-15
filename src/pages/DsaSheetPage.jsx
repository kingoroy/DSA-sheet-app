import React, { useState } from 'react'
import { topics } from '../data/topic';
import { IoIosArrowDown } from "react-icons/io";
import Problems from '../components/Problems';

const DsaSheetPage = () => {
  const [activeTopic, setActiveTopic] = useState('');

  const handleClickTopic = (topic) => {
    if (activeTopic?.topicId === topic?.topicId) {
      setActiveTopic('');
    } else {
      setActiveTopic(topic);
    }
    console.log(topic, 'topic');

  }

  return (
    <div className='global-margin'>
      <div className='dsaSheetContainer'>
        {topics?.map((topic) => (
          <div key={topic?.topicId} className='dsaTopicContainer'>
            <div className='dsaDropdownOption'  onClick={()=>handleClickTopic(topic)}>
              <p className='topicName'>{topic?.topicName}</p>
              <div className='dsaTopicRightWrapper'>
                <div>
                  0/10
                </div>
                {/* <input type='checkbox' /> */}
                <div>
                  <IoIosArrowDown />
                </div>
              </div>
            </div>
            <ul>
            {activeTopic?.topicId===topic?.topicId && <Problems topic={topic}/>}
          </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DsaSheetPage;
