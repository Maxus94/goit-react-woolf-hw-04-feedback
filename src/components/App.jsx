import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

import css from './App.module.css';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const handleClick = option => {
    switch (option) {
      case 'good':
        return setGood(prev => prev + 1);
      case 'neutral':
        return setNeutral(prev => prev + 1);
      case 'bad':
        return setBad(prev => prev + 1);
      default:
        return;
    }
  };

  function countTotalFeedback() {
    return good + bad + neutral;
  }

  function countPositiveFeedbackPercentage() {
    return ((good / countTotalFeedback()) * 100).toFixed(0);
  }

  return (
    <div className={css.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleClick}
        />
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
