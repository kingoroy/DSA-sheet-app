import React from 'react'

const Problems = ({topic}) => {
    console.log(topic, 'topic');
    const problems = topic?.problems;
  return (
    <div className='problemsContainer'>
      <table className='problemsTableContainer'>
        <thead>
          <tr>
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
              <td>{problem.problemName}</td>
              <td>{problem.difficultyLevel}</td>
              <td><a href={problem.youtubeLink}>Youtube</a></td>
              <td><a href={problem.leetCode}>LeetCode</a></td>
              <td><a href={problem.articleLink}>Article</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Problems;