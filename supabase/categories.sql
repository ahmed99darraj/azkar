-- إنشاء جدول التصنيفات
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT
);

-- تمكين RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- إضافة سياسة القراءة العامة
CREATE POLICY "Allow public read access for categories" ON categories
    FOR SELECT USING (true);

-- إضافة التصنيفات الرئيسية
INSERT INTO categories (name, description, icon) VALUES
('أذكار الصباح', 'الأذكار المستحبة في الصباح', '🌅'),
('أذكار المساء', 'الأذكار المستحبة في المساء', '🌄'),
('أذكار بعد الصلاة', 'الأذكار المستحبة بعد الصلوات المفروضة', '🕌'),
('أذكار النوم', 'الأذكار المستحبة قبل النوم', '🌙'),
('أذكار الاستيقاظ', 'الأذكار المستحبة عند الاستيقاظ', '⏰'),
('الأدعية المأثورة', 'أدعية من القرآن والسنة', '🤲'),
('التسبيح والتهليل', 'أذكار التسبيح والتحميد والتهليل', '📿'),
('الاستغفار', 'صيغ الاستغفار المختلفة', '🌟');

-- إضافة عمود التصنيف للأذكار
ALTER TABLE azkar ADD COLUMN category_id BIGINT REFERENCES categories(id);
