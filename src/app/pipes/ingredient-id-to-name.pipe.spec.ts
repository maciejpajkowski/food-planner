import { IngredientIdToNamePipe } from './ingredient-id-to-name.pipe';

describe('IngredientIdToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new IngredientIdToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
