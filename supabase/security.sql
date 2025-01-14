-- Enable Row Level Security
ALTER TABLE azkar ENABLE ROW LEVEL SECURITY;
ALTER TABLE radio_stations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for azkar" ON azkar
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access for radio stations" ON radio_stations
    FOR SELECT USING (true);

-- Disable write access for anonymous users
CREATE POLICY "Disable public write access for azkar" ON azkar
    FOR INSERT WITH CHECK (false);
CREATE POLICY "Disable public write access for azkar update" ON azkar
    FOR UPDATE USING (false);
CREATE POLICY "Disable public write access for azkar delete" ON azkar
    FOR DELETE USING (false);

CREATE POLICY "Disable public write access for radio stations" ON radio_stations
    FOR INSERT WITH CHECK (false);
CREATE POLICY "Disable public write access for radio stations update" ON radio_stations
    FOR UPDATE USING (false);
CREATE POLICY "Disable public write access for radio stations delete" ON radio_stations
    FOR DELETE USING (false);
