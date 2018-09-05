<template>
    <div class="container">
        <form class="control-group">
            <h1>How is your day?</h1>
            <label class="control control--radio">Good
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Not Good
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Mediocre
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Bad
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <label class="control control--radio">Very Bad
                <input type="radio" name="radio"/>
                <div class="control__indicator"></div>
            </label>
            <div class="button-container">
                <button class="button -regular center">Next</button>
            </div>
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
  width: 40%;
  height: 50%;
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

.button-container {
  display: flex;
  margin: 60px auto;
  flex-wrap: wrap;
  justify-content: center;
}
.button {
  display: flex;
  overflow: hidden;
  margin: 10px;
  padding: 12px 12px;
  cursor: pointer;
  user-select: none;
  transition: all 150ms linear;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;
  color: #fff;
  border: 0 none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  justify-content: center;
  align-items: center;
  flex: 0 0 160px;
  box-shadow: 2px 5px 10px var(--color-smoke);
  &:hover {
    transition: all 150ms linear;
    opacity: 0.85;
  }
  &:active {
    transition: all 150ms linear;
    opacity: 0.75;
  }
  &:focus {
    outline: 1px dotted #959595;
    outline-offset: -4px;
  }
}
.button.-regular {
  color: #202129;
  background-color: #d3d0d0;
  &:hover {
    color: #202129;
    background-color: #e1e2e2;
    opacity: 1;
  }
  &:active {
    background-color: #d5d6d6;
    opacity: 1;
  }
}
</style>

