import { MealIdToNamePipe } from './meal-id-to-name.pipe';

describe('MealIdToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new MealIdToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
