class Function < ApplicationRecord
  belongs_to :language
  include AlgoliaSearch

  algoliasearch do
    attributes :key_words, :function_name, :klass, :content, :code

    searchableAttributes ['key_words', 'function_name', 'klass']

    # customRanking ['desc(key_words)']
  end
end
