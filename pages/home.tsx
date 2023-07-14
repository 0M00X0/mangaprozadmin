import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

interface HomeProps {
  changeLanguage: (lng: string) => void;
}
function Home({ changeLanguage }: HomeProps): ReactNode {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('site_title')}</h1>
      <nav>
        <ul>
          <li>{t('dashboard')}</li>
          <li>{t('logout')}</li>
        </ul>
      </nav>
      <button onClick={() => handleLanguageChange('en')}
      className='m-3'
      >{t('english')}</button>
      <button onClick={() => handleLanguageChange('ar')}
      >{t('arabic')}</button>
    </div>
  );
}

export default Home;
