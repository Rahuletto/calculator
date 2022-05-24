<script setup>
import Btn from "./button.vue";
</script>

<script>

export default {
  data() {
    return {
      data: "",
      result: "",
      equal: false,
      rad: true,
    };
  },
  methods: {
    enter(no, symbol = false) {
     
      this.equal = true;
      this.data = (this.data.toString() +  no.toString())
      try {
        if (this.data != "") this.result = math(this.data, this.$math, this.rad);
        else this.result = "";
      } catch (err) {
        console.log(err)
        this.result =  "Math Error"
      }
    },
    clear() {
      
      this.equal = true;
      this.data = "";
      this.result = ""
    },
    round() {
      if(this.result == "") return;
      
      this.result = this.$math.format(this.result, {precision: 5});
    },
    scifi() {
      slido()
    },

    back() {
      this.equal = true;
      this.data = this.data.slice(0, -1);
      try {
        if (this.data != "") this.result = math(this.data, this.$math, this.rad);
        else this.result = "";
      } catch (err) {
        console.log(err)
        this.result = "Math Error"
      }
    },
    eval() {
      this.equal = !this.equal;

      try {
        if (this.data != "") this.result = math(this.data, this.$math, this.rad)
        else this.result = "";
      } catch (err) {
        console.log(err)
        this.result = "Math Error"
      }
    },
    deg() {
      this.rad = false;
      if (this.data != "") this.result = math(this.data, this.$math, this.rad);
      else this.result = "";
    },
    radian() {
      this.rad = true;
      if (this.data != "") this.result = math(this.data, this.$math, true);
      else this.result = "";
    },



  },
};

function math(data, mathy, rad = true) {


  let input = data;
  input = input
    .replaceAll("cos⁻¹(", "acos(")
    .replaceAll("sin⁻¹(", "asin(")
    .replaceAll("tan⁻¹(", "atan(")
    .replaceAll("³√(", "cbrt(")
    .replaceAll("log(", "log10(")
    .replaceAll("ln(", "log(")
    .replaceAll(")(", ")*(")
    .replaceAll("°", " deg")
    .replaceAll('>>', 'in')
    .replaceAll('>', 'to')
    .replaceAll('π', 'pi')
  .replaceAll('Φ', '1.618033988749895')

  if(input.includes("d/dx")) {
    
  input = input.replaceAll(`d/dx`, ``)

    input = mathy.parse(input)
  
  return mathy.derivative(input, "x").toString()
  
  }
if(input.includes('√')){
  let nr = input.split("√");
  let l = nr.length;
  nr = input.split("√")[0].substring(0, l);

  input = input.replaceAll(`${nr || 2}√(`, ``).replaceAll(')', '');
  
  input = mathy.nthRoot(input, nr).toString()
  
}
  if (input.includes("!")) {
    let spl = input.split("!")
    let n = Number(spl[0].substring(0, spl.length));
    let f = 1;

    for (let i = 2; i <= n; i++) f = f * i;
    input = input.replaceAll(n + "!", f);
  }


  if (
    (!rad && input.includes("sin")) ||
    (!rad && input.includes("cos")) ||
    (!rad && input.includes("tan"))
  ) {
    return (
      (
        mathy.evaluate(input) *
        (180 / Math.PI)
      ).toString() + "°"
    );
  } else return mathy.evaluate(input);
}
 

function slido(){
  
var slider = document.getElementsByClassName('slider-parent')[0];
  let shade = document.getElementsByClassName('shader')[0]

  
if(slider.classList.contains("active")){
  shade.classList.remove('on')
  slider.classList.remove("active");
 } else {
  shade.classList.add("on")
  slider.classList.add("active");
 }
}
</script>

<template>
  <header>
    <div class ="shader">
    </div>
      <div class="slider-container">
       <div class="slider-parent">

<div style="display: flex">
<button @click="scifi()"  class="bar">
</button>
</div>
         
<grido3>
        <Btn @click="enter('sin⁻¹(', true)" name="sin⁻¹" type="symbol" />
        <Btn @click="enter('cos⁻¹(', true)" name="cos⁻¹" type="symbol" />
        <Btn @click="enter('tan⁻¹(', true)" name="tan⁻¹" type="symbol" />

          <Btn @click="enter('x', false)" name="𝑥" type="symbol" />
        <Btn @click="enter('y', false)" name="𝑦" type="symbol" />
        <Btn @click="enter('z', false)" name="𝑧" type="symbol" />


        <Btn @click="enter('³√(', true)" name="3√⬚" type="symbol" />

          
      <Btn @click="enter('°', false)" name="⬚°" type="symbol" />
        <Btn @click="enter('!', false)" name="⬚!" type="symbol" />
                  <Btn @click="enter('e', true)" name="e" type="symbol" />
                            <Btn @click="enter('π', true)" name="π" type="symbol" />
                               <Btn @click="enter('Φ', true)" name="Φ" type="symbol" />
                              
        <Btn @click="enter(' mod ', false)" name="mod" type="symbol" />
      <Btn @click="enter('d/dx(', false)" name="d/dx" type="symbol" />
      <Btn @click="enter('*10^(', false)" name="x10ˣ" type="symbol" />
        
        <Btn @click="enter(' inch > cm', false)" name="in ❯ cm" type="symbol" />
        <Btn @click="enter(' cm > inch', false)" name="cm ❯ in" type="symbol" />
          <Btn @click="enter(' inch > yards', false)" name="in ❯ yard" type="symbol" />
        <Btn @click="enter(' km/h > m/s', false)" name="km/h ❯ m/s" type="symbol" />
        <Btn @click="enter(' m/s > km/h', false)" name="m/s ❯ km/h" type="symbol" />
        <Btn @click="enter(' km > mile', false)" name="km ❯ mile" type="symbol" />
        <Btn @click="enter(' mile > km', false)" name="mile ❯ km" type="symbol" />
        <Btn @click="enter(' celsius >> fahrenheit', false)" name="C° ❯ F°" type="symbol" />
        <Btn @click="enter(' fahrenheit >> celsius', false)" name="F° ❯ C°" type="symbol" />
          <Btn @click="enter(' celsius >> kelvin', false)" name="C° ❯ K" type="symbol" />
        <Btn @click="enter(' fahrenheit >> kelvin', false)" name="F° ❯ K" type="symbol" />


        </grido3>
        </div>
      </div>


      <holder>
       
        <display>
          <div v-if="equal" class="data">{{ data }}</div>
          <div v-else class="data-eq">{{ data }}</div>
          <div v-if="equal" class="result">{{ result }}</div>
          <div v-else class=" equaled">{{ result }}</div>
        </display>
        <grido>
          <Btn @click="enter('log(')" name="log" />
          <Btn @click="enter('ln(')" name="ln" />
          <Btn :class="{ activy: !rad }" @click="deg()" name="DEG" />
          <Btn :class="{ activy: rad }" @click="radian()" name="RAD" />
          <Btn @click="enter('(')" name="(" />
          <Btn @click="enter(')')" name=")" />
          <Btn @click="enter('^')" name="^" />
          <Btn @click="enter('√(')" name="√⬚" />
          <Btn @click="clear()" class="symbol" name="AC" />
          <Btn @click="back()" class="symbol" name="DEL" />
          <Btn @click="enter('%')" class="symbol" name="%" />
          <Btn @click="enter('/')" class="symbol" name="/" />
          <Btn @click="enter('7')" name="7" />
          <Btn @click="enter('8')" name="8" />
          <Btn @click="enter('9')" name="9" />
          <Btn @click="enter('*')" class="symbol" name="x" />
          <Btn @click="enter('4')" name="4" />
          <Btn @click="enter('5')" name="5" />
          <Btn @click="enter('6')" name="6" />
          <Btn @click="enter('-')" class="symbol" name="-" />
          <Btn @click="enter('1')" name="1" />
          <Btn @click="enter('2')" name="2" />
          <Btn @click="enter('3')" name="3" />
          <Btn @click="enter('+')" class="symbol" name="+" />
          <Btn @click="enter('00')" name="00" />
          <Btn @click="enter('0')" name="0" />
          <Btn @click="enter('.')" name="." />
          <Btn @click="eval()" class="equal" name="=" />
        </grido>
            <div class="flex">
            <button @click="scifi()" class="slider-trigger">
            
   Scientific
            </button>
              <button @click="round()" class="slider-trigger">
            
   Round off
              </button>
            </div>
            <grido3 style="grid-template-rows: 1fr;" >
            <Btn @click="enter('sin(', true)" name="sin" type="symbol" />
        <Btn @click="enter('cos(', true)" name="cos" type="symbol" />
        <Btn @click="enter('tan(', true)" name="tan" type="symbol" />
        </grido3>
        
      </holder>
   
  </header>
</template>

<style scoped>
  .flex {
    display: flex;
    flex-direction: row;
  }
.activy {
  background: #0b780b41;
  color: lightgrey;
  border: 2px solid #0b780bab;
}

.data {
  color: lightgrey;
  font-size: 24px;
  padding: 0px;
}

.data-eq {
  color: rgba(211, 211, 211, 0.603);
  padding: 0;
}
.equaled {
  color: lightgrey;
  font-size: 28px;
  padding: 0px;
  user-select: text;
}
.result {
  color: rgba(211, 211, 211, 0.603);
  padding: 0px;
  user-select: text;
}

.symbol {
  height: 45px;
  background-color: #7a00ffba;
  color: lightgrey;
  border: 2px solid #7a00ffba;
}

.equal {
  height: 45px;
  background: #0b780bf2;
  color: lightgrey;
  border: 2px solid #0b780bf2;
}

grido {
  display: grid;
  grid-gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

  
grido2 {
  display: grid;
  grid-gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
}

  grido3 {
 max-height: 80%;
    border-radius: 15px;
    overflow: scroll;


    padding-top: 20px;
    display: grid;
  grid-gap: 15px;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(10, 1fr)
  }

  grido3 .btn {
  height: 45px;
    border-radius: 12px;
    width: auto;
    line-height: 1;
  }
  
grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  margin: 15px;
  background-color: #04040436;
  border-radius: 10px;
  grid-gap: 10px;
  padding: 15px;
}

display {
  background-color: #0a0a0a;
  border-radius: 11px;
  display: flex;
  color: #c7c7c7;
  font-size: 22px;
  height: 90px;
  padding: 6px 14px;
  overflow: auto;
  margin: 5px;
  flex-direction: column;
}

grid div {
 display: grid;
  grid-gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(10, 1fr);

}

.bar {
  padding: 3px;
margin: 0px auto;

  border-radius: 100px;
  width: 25vw;
  border: 0px solid;
}
holder {
  
  position: fixed;
  top: 0%;
  right: 50%;
  transform: translate(50%, 0%);
  
  width: 100vw;
  min-width: 365px;
  max-width: 400px;
  
  border-radius: 14px;
  background: #161616;
  height: 100vh;
  display: flex;
  flex-direction: column;
  
  justify-content: center;
  padding: 10px;
  box-shadow: 0px 0px 25px #000000;
}
.slider-trigger {
  border: 0px solid;
  background: #ffffff0a;
  width: 100%;
  border-radius: 11px;
  color: #ffffff;
  font-family: 'Lexend Deca';
  margin-left: 6px;
  margin-right: 6px;
}
  
  .slider-container {
    margin: 0px;
    padding: 0px;
  position: relative;
 }
  .slider-container .slider-parent {
    
    padding: 10px;
    height: 80vh;
    
    width: 99.7vw;
    max-width: 400px;
    background: #121212;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0%);
    top: 110vh;
    
    visibility: hidden;
    opacity: 1;
    pointer-events: none;
    transition: 0.6s all ease-in-out;
    z-index: 100;

  padding: 10px;
  box-shadow: 0px 0px 25px #000000;
  border-radius: 11px;
    border: 2px #ffffff12 solid;
 }
   .slider-container .slider-parent.active {
     overflow: default;
      visibility: visible;
      pointer-events: inherit;
      transition: 0.4s all ease-in-out;
      opacity: 1;
      left: 50%;
      transform: translate(-50%, 0%);
     top: 260px;
   }

  .shader {
    
    transition: 0.6s all ease-in-out;
    position: fixed;
    z-index: 12;
    width: 100vw;
    height: 100vh;
    background: #00000084;
    opacity: 0;
    top: 0;
    left: 0;
    
    visibility: hidden;
    
    pointer-events: none;
  }
  .on {
    transition: 0.4s all ease-in-out;
    opacity: 1;
    
      visibility: visible;
      pointer-events: inherit;
  }

</style>
