<template>
    <div class="container">
        <form class="control-group">
            <h1>Radio buttons</h1>
            <label class="control control--radio">First radio
                <input type="radio" name="radio" checked="checked"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Second radio
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Third radio
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Fourth radio
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Fourth radio
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Fourth radio
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <!-- <label class="control control--radio">Disabled
                <input type="radio" name="radio2" disabled="disabled"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Disabled & checked
                <input type="radio" name="radio2" disabled="disabled" checked="checked"/>
                <div class="control__indicator"></div>
            </label> -->
        </form>
    </div>
</template>

<style lang="scss" scoped>
$color_1: #7b7b7b;
$color_2: #000;
$font_family_1: "Source Sans Pro", sans-serif;
$font_family_2: "Alegreya Sans", sans-serif;
$border_color_1: #7b7b7b;
$border_color_2: #7b7b7b transparent transparent transparent;
$border_top_color_1: #000;
$border_top_color_2: #ccc;

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: #f4f6f9;
}
h1 {
  font-family: $font_family_2;
  font-weight: 300;
  margin-top: 0;
}
.control-group {
  display: flex;
  flex-direction: column;
  vertical-align: top;
  text-align: left;
  padding: 30px;
  height: 100%;
  width: 100vh;
  margin: 10px;
}
.control {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 18px;
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    &:focus {
      & ~ .control__indicator {
        background: #ccc;
      }
    }
    &:checked {
      & ~ .control__indicator {
        background: #2aa1c0;
        &:after {
          display: block;
        }
      }
      &:focus {
        & ~ .control__indicator {
          background: #0e647d;
        }
      }
    }
    &:disabled {
      & ~ .control__indicator {
        background: #e6e6e6;
        opacity: 0.6;
        pointer-events: none;
      }
    }
  }
  &:hover {
    input {
      & ~ .control__indicator {
        background: #ccc;
      }
      &:not([disabled]) {
        &:checked {
          & ~ .control__indicator {
            background: #0e647d;
          }
        }
      }
    }
  }
}
.control__indicator {
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  background: #e6e6e6;
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
}
.control--radio {
  .control__indicator {
    border-radius: 50%;
    &:after {
      left: 7px;
      top: 7px;
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background: #fff;
    }
  }
  input {
    &:disabled {
      & ~ .control__indicator {
        &:after {
          background: #7b7b7b;
        }
      }
    }
  }
}
.control--checkbox {
  .control__indicator {
    &:after {
      left: 8px;
      top: 4px;
      width: 3px;
      height: 8px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
  input {
    &:disabled {
      & ~ .control__indicator {
        &:after {
          border-color: $border_color_1;
        }
      }
    }
  }
}
</style>

