
INSERT INTO mood_palette(palette_code, palette_name)
values ('P001', 'basic'), ('P002', 'teracota'), ('P003', 'vintage'), ('P004', 'christmas'), ('P005', 'mono');

INSERT INTO mood_palette_details(palette_code, mood_code, color_code, mood)
values ('P001', 'm001', 'f7bObe', 'happy'),
       ('P001', 'm002', 'ed8e83', 'sad'),
       ('P001', 'm003', 'ef3c23', 'anger'),
       ('P001', 'm004', 'f15a42', 'flutter'),
       ('P001', 'm005', 'fac92c', 'worry'),
       ('P001', 'm006', 'cfe5cc', 'calm'),
       ('P001', 'm007', '2178ae', 'sensitive'),
       ('P001', 'm008', '1b4793', 'hope'),

       ('P002', 'm001', 'CE7E5D', 'happy'),
       ('P002', 'm002', 'CDD6DD', 'sad'),
       ('P002', 'm003', 'A2543D', 'anger'),
       ('P002', 'm004', 'D39A89', 'flutter'),
       ('P002', 'm005', 'D6DCD8', 'worry'),
       ('P002', 'm006', 'D6DCD8', 'calm'),
       ('P002', 'm007', '1D354F', 'sensitive'),
       ('P002', 'm008', '557570', 'hope'),

       ('P003', 'm001', 'E7AF8D', 'happy'),
       ('P003', 'm002', 'B0AEBA', 'sad'),
       ('P003', 'm003', 'CD686D', 'anger'),
       ('P003', 'm004', 'E08890', 'flutter'),
       ('P003', 'm005', 'A2A987', 'worry'),
       ('P003', 'm006', 'F0DCB1', 'calm'),
       ('P003', 'm007', 'BEB5BF', 'sensitive'),
       ('P003', 'm008', 'A9C0C5', 'hope'),

       ('P004', 'm001', 'C66157', 'happy'),
       ('P004', 'm002', 'BDB7A1', 'sad'),
       ('P004', 'm003', 'A7241C', 'anger'),
       ('P004', 'm004', 'DF5756', 'flutter'),
       ('P004', 'm005', 'A38440', 'worry'),
       ('P004', 'm006', '7D873B', 'calm'),
       ('P004', 'm007', '5A958E', 'sensitive'),
       ('P004', 'm008', '2E5542', 'hope'),

       ('P005', 'm001', 'E4E4E4', 'happy'),
       ('P005', 'm002', '666666', 'sad'),
       ('P005', 'm003', '000000', 'anger'),
       ('P005', 'm004', 'D4D4D4', 'flutter'),
       ('P005', 'm005', '7D7D7D', 'worry'),
       ('P005', 'm006', '9D9D9D', 'calm'),
       ('P005', 'm007', '434343', 'sensitive'),
       ('P005', 'm008', 'B4B4B4', 'hope');
