-- Create azkar table
CREATE TABLE azkar (
    id BIGSERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    count INTEGER,
    description TEXT,
    category TEXT
);

-- Create radio_stations table
CREATE TABLE radio_stations (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT
);

-- Insert sample azkar data
INSERT INTO azkar (text, count, category, description) VALUES
('سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', 100, 'أذكار الصباح', 'من قالها مائة مرة حُطت خطاياه وإن كانت مثل زبد البحر'),
('لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير', 100, 'أذكار المساء', 'من قالها في يوم مائة مرة كانت له عدل عشر رقاب'),
('أستغفر الله العظيم', 100, 'الاستغفار', 'من لزم الاستغفار جعل الله له من كل هم فرجا'),
('اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ', 10, 'الصلاة على النبي', 'من صلى علي حين يصبح وحين يمسي أدركته شفاعتي يوم القيامة');

-- Insert sample radio stations data
INSERT INTO radio_stations (name, url, description) VALUES
('إذاعة القرآن الكريم من مكة المكرمة', 'https://stream.radiojar.com/4wqre23fytzuv', 'البث المباشر من المسجد الحرام'),
('إذاعة القرآن الكريم من المدينة المنورة', 'https://stream.radiojar.com/5wpf9e93fytzuv', 'البث المباشر من المسجد النبوي'),
('إذاعة الشيخ مشاري العفاسي', 'https://qurango.net/radio/mishary_alafasy', 'تلاوات متنوعة للشيخ مشاري راشد العفاسي'),
('إذاعة الشيخ ماهر المعيقلي', 'https://qurango.net/radio/maher_almaikulai', 'تلاوات متنوعة للشيخ ماهر المعيقلي');
