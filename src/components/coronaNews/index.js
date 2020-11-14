import React, { useEffect, useState } from 'react';
import app from '../../services/firebase';
import 'firebase/database';
import './style.css';

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="all-news">
        {news.map((item) => {
          return (
            <div>
              <p style={{ marginTop: '2em' }} key={item.id}>
                {item.date}
              </p>
              <div className="news">
                {item.activity.map((activity) => {
                  return (
                    <a href={activity.url}>
                      <h2 className="news-title">{activity.title}</h2>
                      <p className="news-desc">{activity.desc}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoronaNews;
