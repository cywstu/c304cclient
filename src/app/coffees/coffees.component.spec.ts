import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeComponent } from '../coffee/coffee.component';

import { CoffeesComponent } from './coffees.component';


describe('CoffeesComponent', () => {
  let component: CoffeesComponent;
  let fixture: ComponentFixture<CoffeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("get coffees", () =>{
    //expect(component.getCoffee()[0]).toContain("name")
  });
});
