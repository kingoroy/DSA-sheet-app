import React, { useEffect, useState } from 'react';
import { FaYoutube } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { toast } from 'react-toastify';

const Problems = ({ topic, completedProblems, setCompletedProblems, isLoggedIn, setOpenModal }) => {
  useEffect(() => { 
    if (!isLoggedIn) {
      setCompletedProblems([]);
    } 
  }, [isLoggedIn]);

  const handleCheckboxChange = (problemId) => {
    if (!isLoggedIn) {
      setOpenModal(true);
      toast.info('Please login to mark the problem as completed', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
    setCompletedProblems((prev) => {
      if (prev.includes(problemId)) {
        return prev.filter(id => id !== problemId);
      } else {
        return [...prev, problemId];
      }
    });
  };
  
  const problems = topic?.problems;
  return (
    <div className='problemsContainer'>
      <div className='problemsTableWrapper'>
        <table className='problemsTableContainer'>
          <thead>
            <tr>
              <th>Status</th>
              <th>Problem Name</th>
              <th>Difficulty Level</th>
              <th>Youtube</th>
              <th>LeetCode</th>
              <th>Article</th>
            </tr>
          </thead>
          <tbody>
            {problems?.map((problem) => (
              <tr key={problem.problemId}>
                <td>
                  <input
                    type='checkbox'
                    checked={completedProblems?.includes(problem?.problemId)}
                    onChange={() => handleCheckboxChange(problem?.problemId)}
                  />
                </td>
                <td>{problem.problemName}</td>
                <td>
                  <p className={`difficulty-${problem?.difficultyLevel?.toLowerCase()}`}>{problem.difficultyLevel}</p></td>
                <td><a href={problem.youtubeLink} className='youtubeCell'><FaYoutube /></a></td>
                <td><a href={problem.leetCode} className='codeCell'><FaCode /></a></td>
                <td><a href={problem.articleLink} className='articleCell'><RiArticleLine /></a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problems;