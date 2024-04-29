describe('Reminder Management', () => {
    afterAll(async () => {
      // Any cleanup tasks after all tests are run, like closing the database connection
    });
  
    it('should add a new reminder', async () => {
      const res = await agent
        .post('/add-reminder')
        .send({
          date: '2024-05-01',
          time: '15:00',
          message: 'Time to Stretch'
        })
        .expect(200);
  
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Reminder added successfully.');
    });
  
    it('should retrieve reminders', async () => {
      const res = await agent
        .get('/get-reminders')
        .expect(200);
  
      expect(Array.isArray(res.body)).toBe(true); // Checking that an array of reminders is returned
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('date');
        expect(res.body[0]).toHaveProperty('time');
        expect(res.body[0]).toHaveProperty('message');
      }
    });
  
    it('should update an existing reminder', async () => {
      const updateData = {
        id: 1, // Assuming there's an ID to specify which reminder to update
        date: '2024-05-02',
        time: '16:00',
        message: 'Time for your daily run'
      };
      const res = await agent
        .put('/update-reminder')
        .send(updateData)
        .expect(200);
  
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Reminder updated successfully.');
    });
  
    it('should delete a reminder', async () => {
      const res = await agent
        .delete('/delete-reminder')
        .send({ id: 1 }) // Assuming there's an ID to specify which reminder to delete
        .expect(200);
  
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Reminder deleted successfully.');
    });
  });
  
