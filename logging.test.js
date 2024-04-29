describe('Workout Logging', () => {
    afterAll(async () => {
      // Cleanup tasks after all tests are done
    });
  
    it('should log a new workout', async () => {
      const newWorkout = {
        userId: 1, // Assuming a userId is necessary to associate the workout
        type: 'Running',
        duration: 30, // Duration in minutes
        intensity: 'Moderate'
      };
      const res = await agent
        .post('/log-workout')
        .send(newWorkout)
        .expect(200);
  
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Workout logged successfully.');
    });
  
    it('should prevent duplicate workouts', async () => {
      const duplicateWorkout = {
        userId: 1,
        type: 'Running',
        duration: 30,
        intensity: 'Moderate'
      };
      // First, log the workout
      await agent
        .post('/log-workout')
        .send(duplicateWorkout)
        .expect(200);
  
      // Try to log the same workout again
      const res = await agent
        .post('/log-workout')
        .send(duplicateWorkout)
        .expect(400); // Assuming the server responds with a 400 status for duplicates
  
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Duplicate workout detected.');
    });
  });
  
