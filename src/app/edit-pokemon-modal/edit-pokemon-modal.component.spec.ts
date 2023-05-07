import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPokemonModalComponent } from './edit-pokemon-modal.component';

describe('EditPokemonModalComponent', () => {
  let component: EditPokemonModalComponent;
  let fixture: ComponentFixture<EditPokemonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPokemonModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPokemonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
