import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTranslation } from 'react-i18next';

function GithubChart() {
    const { t } = useTranslation();
    const [joinDate, setJoinDate] = useState("");

    useEffect(() => {
        fetch('https://api.github.com/users/raka-wijaya')
            .then(res => res.json())
            .then(data => {
                const date = new Date(data.created_at);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                setJoinDate(date.toLocaleDateString('id-ID', options));
            })
            .catch(err => console.error("Gagal ambil data:", err));
    }, []);

    return (
        <div className="mx-auto flex flex-col justify-center items-center">
            <h1 data-aos="fade-up" data-aos-delay="50" className="text-3xl font-bold font-Poppins text-gray-900 mb-2">{t("github.title")}</h1>
            <p data-aos="fade-up" data-aos-delay="100" className="text-gray-500 mb-2 font-Poppins">{t("github.desc")}</p>
            {joinDate && (
                <p data-aos="fade-up" data-aos-delay="150" className="text-sm text-blue-600 font-Poppins mb-4">
                    github since {joinDate}
                </p>
            )}

            <GitHubCalendar username="raka-wijaya" />
        </div>
    );
}

export default GithubChart;