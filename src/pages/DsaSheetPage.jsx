import React, { useEffect, useState } from 'react';
import { topics } from '../data/topic';
import { IoIosArrowDown } from "react-icons/io";
import Problems from '../components/Problems';
import { retrieveTopicId } from '../components/helper';

const DsaSheetPage = ({ activeEmail, registeredUsers, isLoggedIn, setOpenModal }) => {
  const [activeTopic, setActiveTopic] = useState('');
  const user = registeredUsers.find(user => user.email === activeEmail);
  const initialCompletedProblems = user ? user.completedProblems : [];
  const [completedProblems, setCompletedProblems] = useState(isLoggedIn ? initialCompletedProblems : []);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUsers = JSON.parse(localStorage.getItem('userDetails')) || [];
      const storedUser = storedUsers.find(user => user.email === activeEmail);
      if (storedUser) {
        setCompletedProblems(storedUser.completedProblems || []);
      }
    }
  }, [isLoggedIn, activeEmail]);

  const handleClickTopic = (topic) => {
    if (activeTopic?.topicId === topic?.topicId) {
      setActiveTopic('');
    } else {
      setActiveTopic(topic);
    }
  }

  const exactCompletionNumber = (topic) => {
    let count = 0;
    if (!isLoggedIn) {
      return 0;
    }
    topic?.problems?.forEach(problem => {
      if (completedProblems?.includes(problem?.problemId)) {
        count++;
      }
    });
    return count;
  };

  useEffect(() => {
    if (isLoggedIn) {
      const addCompleteProblems = registeredUsers.map(user => {
        if (user?.email === activeEmail) {
          user.completedProblems = completedProblems;
        }
        return user;
      });
      localStorage.setItem('userDetails', JSON.stringify(addCompleteProblems));
    }
  }, [completedProblems, isLoggedIn, activeEmail, registeredUsers]);

  return (
    <div className='global-margin'>
      <div className='dsaSheetContainer'>
        <div className='titleWrapper'>
        <h1>NyN’s DSA Sheet – Top Coding Interview Problems</h1>
        <p>DSA Sheet contains very handily crafted and picked top coding interview questions from different topics of Data Structures & Algorithms. These questions are one of the most asked coding interview questions in coding interviews of companies like Google, Amazon, Microsoft, Facebook, Swiggy, Flipkart, etc, and cover almost all of the concepts related to Data Structure & Algorithms.</p>
        </div>
        {topics?.map((topic) => (
          <div key={topic?.topicId} className={`dsaTopicContainer ${retrieveTopicId(completedProblems)?.includes(topic?.topicId) && 'inProgress'}`}>
            <div className='dsaDropdownOption' onClick={() => handleClickTopic(topic)}>
              <p className='topicName'>{topic?.topicName}</p>
              <div className='dsaTopicRightWrapper'>
                <div>
                  {exactCompletionNumber(topic)}/{topic?.problems?.length}
                </div>
                <div className={`arrowIcon ${activeTopic?.topicId === topic?.topicId ? 'rotate' : ''}`}>
                  <IoIosArrowDown />
                </div>
              </div>
            </div>
            <ul className={`dropdownContent ${activeTopic?.topicId === topic?.topicId ? 'open' : ''}`}>
              {activeTopic?.topicId === topic?.topicId && <Problems topic={topic} completedProblems={completedProblems} setOpenModal={setOpenModal}
                setCompletedProblems={setCompletedProblems} registeredUsers={registeredUsers} activeEmail={activeEmail}
                isLoggedIn={isLoggedIn}
              />}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DsaSheetPage;