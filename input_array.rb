#inputArray = ["ab", "bb", "aa"]        # => ["aa", "ab", "bb", ]
inputArray = ["aba", "bbb", "bab"]    # => ["aba", "bab", "bbb"]
def stringsRearrangement(inputArray)
  inputArray.sort!
    comparison = nil
    element = 0
    string_position = 0
    until comparison == true
      first =  inputArray[element][string_position]
      nexT = inputArray[element += 1][string_position]
      comparison = first == nexT

      puts "#{first} #{nexT}"
      if comparison == false
        element += 1
        string_position += 1
      end

      puts "#{first} #{nexT}"
    end

end

stringsRearrangement(inputArray)
